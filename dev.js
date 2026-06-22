const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

function clearCache() {
  const nextDir = path.join(__dirname, '.next')
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true })
    console.log('[dev] Cleared .next cache')
  }
}

function startDev() {
  clearCache()

  const proc = spawn('npx', ['next', 'dev'], {
    stdio: ['inherit', 'inherit', 'pipe'],
  })

  let restarting = false

  proc.stderr.on('data', (data) => {
    const output = data.toString()
    process.stderr.write(output)

    if (restarting) return

    const isCacheError =
      (output.includes('ENOENT') && output.includes('.next')) ||
      output.includes('app-paths-manifest') ||
      output.includes('webpack-runtime') ||
      output.includes('.pack.gz')

    if (isCacheError) {
      restarting = true
      console.log('[dev] Cache error detected — clearing and restarting automatically...')
      proc.kill()
      setTimeout(() => startDev(), 1000)
    }
  })

  proc.on('exit', (code) => {
    if (code !== 0 && code !== null && !restarting) {
      console.log('[dev] Process exited with code', code)
    }
  })
}

startDev()
