const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

console.log('🚀 Building and Installing API Conference Service...\n')

try {
	console.log('📦 Installing dependencies...')
	execSync('npm install', { stdio: 'inherit' })

	console.log('\n🔨 Building application...')
	execSync('npm run build', { stdio: 'inherit' })

	console.log('\n📦 Building executable...')
	execSync('npm run build:exe', { stdio: 'inherit' })

	console.log('\n⚙️ Installing as Windows service...')
	execSync('npm run install-service', { stdio: 'inherit' })

	console.log(
		'\n🎉 Success! API Conference is now installed and running as a Windows service.'
	)
	console.log('\n📋 Service Information:')
	console.log('  Name: API Conference')
	console.log('  Status: Running')
	console.log('  Port: 3333')
	console.log('  API URL: http://localhost:3333')
	console.log('  Swagger: http://localhost:3333/documentation')

	console.log('\n🛠️ Management Commands:')
	console.log('  Start service:   npm run start-service')
	console.log('  Stop service:    npm run stop-service')
	console.log('  Remove service:  npm run uninstall-service')
} catch (error) {
	console.error('\n❌ Error during build and installation:', error.message)
	process.exit(1)
}
