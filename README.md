# MUFLOW

Municipal Flow Platform

This is a starter project skeleton for a future Turborepo/Next.js based City Operations Platform.

## Local development

The web app runs on `http://localhost:3000`.

```bash
npm install
npm run prisma:generate
npm run dev
```

MongoDB is expected at:

```txt
mongodb://localhost:27017/muflow?directConnection=true
```

For this machine, MongoDB can be started with the installed `mongod.exe` and the project-local data folder:

```powershell
New-Item -ItemType Directory -Force -Path .local\mongo-data,.local\mongo-log
Start-Process -WindowStyle Hidden -FilePath 'C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe' -ArgumentList '--dbpath','.local\mongo-data','--logpath','.local\mongo-log\mongod.log','--logappend','--bind_ip','127.0.0.1','--port','27017'
```

If Docker is available, `docker-compose.yml` also defines a MongoDB service.
