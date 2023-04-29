const app = require('./app')

app.listen(3000, (error) => {
  if(error){
    console.log(error.message);
    return;
  }
  console.log('app lissen 3000 port')
})