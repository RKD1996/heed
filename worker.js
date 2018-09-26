onconnect = function(e) {
  var port = e.ports[0];
  port.onmessage = function(e) {
    console.log(e.data[1])
    var workerResult = e.data[0]
    console.log(workerResult)
    var formData = new FormData();
    var cc = 0
    for( var i = 0; i < workerResult.length; i++ ){
      var file = workerResult[i];
      cc++
      formData.append('image_path_' + i , file);
    }
    formData.append('gallery', e.data[1])
    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }
    var url = 'https://api-help.herokuapp.com/gallery/image/'
    fetch(url, {
      method: 'post',
      body: formData,
      //mode: 'cors',
      headers: {
        Authorization: 'Token ' + e.data[2]
      }
    }).then(function(res) {
      console.log(res)
      port.postMessage('All Files have been Uploaded')
    }).catch(function(err){
      console.log(err)
      port.postMessage('the files where not uploaded please try after sometime...')
    })
    //port.postMessage('result: ' + workerResult)
  }
  port.start()
}
