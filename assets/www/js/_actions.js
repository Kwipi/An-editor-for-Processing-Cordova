$(document).ready(function() {

	document.addEventListener("deviceready", onDeviceReady, false);
	
	explorerDiv = null;
	foldersOnly = false;
	
	to_save_input = null;
	
	function onDeviceReady() {
		bindActions();
	}
	
	function bindActions () {
		
		$('#loadFromSd').bind('click', function() {
			explorerDiv = 'loadFromSd_currentDir';
			foldersOnly = false;
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				function(fileSystem){
					root = fileSystem.root;
					listDir(root);
				}, function(evt){
					console.log("File System Error: "+evt.target.error.code);
				}
			);
		});
		
		$('#saveToSd').bind('click', function() {
			explorerDiv = 'saveToSd_currentDir';
			foldersOnly = true;
			to_save_input = 'textarea#code';
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				function(fileSystem){
					root = fileSystem.root;
					listDir(root);
				}, function(evt){
					console.log("File System Error: "+evt.target.error.code);
				}
			);
			$('#saveToSd_save').bind('click', function() {
				writeFile($('#saveToSd_fileName').val());
			});
		});
		
		
		$('#saveToPastebin_save').bind('click', function() {
			console.log("Launching Ajax");
			$.ajax({
				url: "http://processing-editor.kwipi.org/pastebin/api/create",
				type: "POST",
				data: "lang=java&expire=" + $('#saveToPastebin_duration').val() + "&snipurl=1&title=" + $('#saveToPastebin_title').val() + "&text=" + encodeURIComponent($('textarea#code').val()),
				cache: false,
				dataType: 'html',
				success: function ( data ) {
					console.log("Ajax success");
					var htm = data.replace('/view/g', 'raw');
					//var htm = data;
					$('#saveToPastebin_result').html('Your paste is available at :<br /><a href="' + htm + '">' + htm + '</a>');
				}
			});
		});
		
		$('#saveOutputToSd').bind('click', function() {
			explorerDiv = 'saveOutputToSd_currentDir';
			foldersOnly = true;
			to_save_input = 'textarea#output';
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				function(fileSystem){
					root = fileSystem.root;
					listDir(root);
				}, function(evt){
					console.log("File System Error: "+evt.target.error.code);
				}
			);
			$('#saveOutputToSd_save').bind('click', function() {
				writeFile($('#saveOutputToSd_fileName').val());
			});
		});
		
		
		
	}
	
	
	
});
 
