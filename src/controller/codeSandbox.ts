import Docker from "dockerode";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { Request, Response } from "express";
import langCmd from "../utils/langCmd";
import { ExecuteSchema } from "../types/zod";
import { PrismaClient } from "@prisma/client";

const docker = new Docker();
const prisma = new PrismaClient();

const sandbox = async (req: Request, res: Response): Promise<void> => {
    const validation = ExecuteSchema.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ error: validation.error.errors[0].message });
        return;
    }

    const { code, language } = validation.data;

    try {
        const scriptDir = path.join(__dirname, "app");
        if (!fs.existsSync(scriptDir)) {
            fs.mkdirSync(scriptDir, { recursive: true });
        }

        const { fileName, compileCmd, runCmd } = langCmd(language);

        const scriptPath = path.join(scriptDir, fileName);
        fs.writeFileSync(scriptPath, code);

        try {
            execSync("docker inspect code-sandbox");
        } catch {
            console.log("Building Docker image...");
            execSync("docker build -t code-sandbox .");
        }

        const startTime = Date.now();

        const container = await docker.createContainer({
            Image: "code-sandbox",
            Cmd: compileCmd ? ["sh", "-c", `${compileCmd} && ${runCmd.join(" ")}`] : runCmd,
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
            StopTimeout: 1, 
            HostConfig: {
                Memory: 256 * 1024 * 1024, 
                CpuQuota: 50000, 
                NetworkMode: "none", 
                Binds: [`${scriptPath}:/app/${fileName}:ro`], 
                Ulimits: [
                    { Name: "cpu", Soft: 50, Hard: 100 }, 
                    { Name: "nofile", Soft: 50, Hard: 100 },
                ],
            },
        });

        await container.start();
        const timeout = setTimeout(async () => {
            try {
                await container.stop();
                await container.remove();
                res.status(408).json({ error: "Execution timed out (5 seconds limit)." });
            } catch (err) {
                console.error("Error stopping container:", err);
            }
        }, 5000);

        await container.wait();
        clearTimeout(timeout);

        const logsBuffer = await container.logs({ stdout: true, stderr: true });
        const logs = logsBuffer.toString("utf-8").replace(/[\x00-\x1F]/g, "").trim();
        const executionTime = Date.now() - startTime;
        const stats = await container.stats({ stream: false });
        const memoryUsage = Math.round(stats.memory_stats.usage / (1024 * 1024));

        await container.remove();

        res.json({
            output: logs,
            executionTime: `${executionTime}ms`,
            memoryUsage: `${memoryUsage}MB / 256MB`,
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default sandbox;
