$(document).ready( function () {
    
    
   
    
    
    var map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 10,
		center:{lat: 50.462528, lng: 30.541598}
    });
	
	var infowindow = new google.maps.InfoWindow();
    
	function drawMarker(lat1, lng1, image, title) {
        
        
        var point = {lat: lat1, lng: lng1};
        
        var marker = new google.maps.Marker({
            position: point,
            map: map,
            title: title,
            icon: image,
            animation: google.maps.Animation.DROP,
        });
        
        marker.addListener('click', function() {
            infowindow.close;
            map.setZoom(15);
			map.setCenter(marker.getPosition());
            contentString = '<div id="preview">'+'<style>#preview{width: 600px; height: 500px; border: 2px solid #000;background: url('+marker.title+') 100% 100% no-repeat;background-size: cover;}</style>'+'</div>';
			console.log(contentString);
            infowindow.setContent(contentString);
			infowindow.open(map, marker);
        });
        map.setCenter(point);
    }

	(function () {
  if (!window.FileReader) {
    document.write('<strong>Sorry, your web browser does not support the FileReader API.</strong>');
    return;
  }
  var handleFile = function (event) {
    var files, reader, masFiles = [];
      console.log("I'm here");
    files = event.target.files;
	for( var num = 0; num < files.length; num++){
		masFiles.push(files[num]);
	}
	var total = masFiles.map(function(files){
	reader = new FileReader();
    reader.onload = function (event) {
      var exif, tags, tableBody, name, row;

      try {
        exif = new ExifReader();

        // Parse the Exif tags.
        exif.load(event.target.result);
        GPSLat = parseFloat(exif.getTagDescription('GPSLatitude'));
		GPSLng = parseFloat(exif.getTagDescription('GPSLongitude'));
        var image = {
            url : files.name,
            scaledSize :  new google.maps.Size(50, 50),
            }
        var title = files.name;
		drawMarker(GPSLat, GPSLng, image, title);

      } catch (error) {
        alert(error);
      }
    };
		
    // We only need the start of the file for the Exif info.
    reader.readAsArrayBuffer(files.slice(0, 128 * 1024));
	});
  };
        
    onDragOver = function(event) {
        event.preventDefault();
    };
    
    onDragLeave = function(event) {
        event.preventDefault();
    };
        
	onDrop = function(e){
        e.preventDefault();
           var files, reader, masFiles = [];
      console.log("I'm here");
    var dt = e.dataTransfer || (e.originalEvent && e.originalEvent.dataTransfer);    
    files = e.target.files || (dt && dt.files);
	for( var num = 0; num < files.length; num++){
		masFiles.push(files[num]);
	}
	var total = masFiles.map(function(files){
	reader = new FileReader();
    reader.onload = function (event) {
      var exif, tags, tableBody, name, row;

      try {
        exif = new ExifReader();

        // Parse the Exif tags.
        exif.load(event.target.result);
        GPSLat = parseFloat(exif.getTagDescription('GPSLatitude'));
		GPSLng = parseFloat(exif.getTagDescription('GPSLongitude'));
        var image = {
            url : files.name,
            scaledSize :  new google.maps.Size(50, 50),
            }
        var title = files.name;
		drawMarker(GPSLat, GPSLng, image, title);

      } catch (error) {
        alert(error);
      }
    };
		
    // We only need the start of the file for the Exif info.
    reader.readAsArrayBuffer(files.slice(0, 128 * 1024));
	});
    }
        $("#map").on("drop", onDrop);
        $("#map").on("dragover", onDragOver);
        $("#map").on("dragleave", onDragLeave);
        
  window.addEventListener('load', function () {
    document.getElementById('file').addEventListener('change', handleFile, false);
  }, false);
}());	
})