const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

console.log('🔍 Debug Build Process...\n')

try {
	console.log('📁 Current directory:', process.cwd())

	if (!fs.existsSync('package.json')) {
		throw new Error('package.json not found in current directory')
	}
	console.log('✅ package.json found')

	if (!fs.existsSync('src/app.ts')) {
		throw new Error('src/app.ts not found')
	}
	console.log('✅ src/app.ts found')

	if (!fs.existsSync('node_modules')) {
		console.log('📦 Installing dependencies...')
		execSync('npm install', { stdio: 'inherit' })
	} else {
		console.log('✅ node_modules found')
	}

	console.log('\n🔨 Testing TypeScript compilation...')
	execSync('npx tsc --noEmit', { stdio: 'inherit' })
	console.log('✅ TypeScript compilation successful')

	console.log('\n🔨 Building application...')
	execSync('npm run build', { stdio: 'inherit' })
	console.log('✅ Build successful')

	if (!fs.existsSync('dist/app.js')) {
		throw new Error('dist/app.js was not created')
	}
	console.log('✅ dist/app.js created')

	console.log('\n🧪 Testing built application...')
	console.log('Starting application (will run for 5 seconds)...')

	const child = execSync('node dist/app.js', {
		stdio: 'inherit',
		timeout: 5000
	})

	console.log('\n✅ Application started successfully!')
	console.log('\n🎉 All tests passed! You can now proceed with:')
	console.log('  npm run build:exe')
	console.log('  npm run install-service')
} catch (error) {
	console.error('\n❌ Error during debug process:')
	console.error('Message:', error.message)
	console.error('Code:', error.code)
	console.error('Signal:', error.signal)

	if (error.stdout) {
		console.error('STDOUT:', error.stdout.toString())
	}

	if (error.stderr) {
		console.error('STDERR:', error.stderr.toString())
	}

	console.log('\n🔧 Troubleshooting tips:')
	console.log('1. Make sure you have Node.js 18+ installed')
	console.log('2. Check if all environment variables are set')
	console.log('3. Verify database connections')
	console.log('4. Check if port 3333 is available')

	process.exit(1)
}
