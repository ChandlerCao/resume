module.exports = {
  plugins: [
    require('autoprefixer')({
    	browsers: ['last 5 Chrome versions', 'last 45 Firefox versions', 'last 50 opera versions', 'Safari >= 1', 'ie > 3']

    })
  ]
}