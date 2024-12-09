import fs from "fs";

function log(req, res, next) {
  const time = new Date().toISOString();
  const start = process.hrtime();

  res.on("finish", () => {
    const duration = process.hrtime(start);
    const responseTimeMs = duration[0] * 1000 + duration[1] / 1e6;

    const logMessage = `[${time}] ${req.method} ${req.url} ::${
      req.ip || "unknown"
    } - Status: ${res.statusCode}, Response Time: ${responseTimeMs.toFixed(
      0
    )}ms\n`;

    fs.appendFileSync("app.log", logMessage, "utf8");
  });

  next();
}

export default log;
