module.exports = {
  entry: {
    front: ['./app/Resources/sass/front.scss','./app/Resources/js/front.js']
  },
  port: 3003,
  html: false,
  browsers: ['last 2 versions', 'ie > 8'],
  assets_url: '/',  // Urls dans le fichier final
  assets_path: './web/dist/', // ou build ?
  refresh: [''], // Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
  historyApiFallback: false, // Passer à true si on utilise le mode: 'history' de vue-router (redirige toutes les requêtes sans réponse vers index.html)
  debug: process.env.NODE_ENV === 'development'
}
