var explorerDiv = null;
var foldersOnly = false;

var to_save_input = null;


var root = null; // File System root variable
var currentDir = null; // Current DirectoryEntry listed
var parentDir = null; // Parent of the current directory

var activeItem = null; // The clicked item
var activeItemType = null; // d-directory, f-file
var clipboardItem = null; // file or directory for copy or move 
var clipboardAction = null; // c-copy, m-move
	
var folders = $('.folder');
var files = $('.file');

folders.live('click', function(){
	var name = $(this).text();
	openItem(name, 'd');
	console.log("clicked on " + name);
});

files.live('click', function(){
	var name = $(this).text();
	openItem(name, 'f');
	//console.log("clicked on " + name);
});

function on_read_file (evt) {
	$('textarea#code').val(evt.target.result);
	//$('.ui-dialog').dialog('close');
	$.mobile.changePage($('#processingjs'), 'pop', false, true);
	$('textarea#code').autosize(); 
	$('textarea#code').focus();
}

function on_write_file (evt) {
	//$('.ui-dialog').dialog('close');
	$.mobile.changePage($('#processingjs'), 'pop', false, true);
}

function listDir(directoryEntry){
	if( !directoryEntry.isDirectory ) console.log('listDir incorrect type');
	$.mobile.showPageLoadingMsg(); // show loading message
	
	currentDir = directoryEntry; // set current directory
	directoryEntry.getParent(function(par){ // success get parent
		parentDir = par; // set parent directory
	}, function(error){ // error get parent
		console.log('Get parent error: '+error.code);
	});
	
	var directoryReader = directoryEntry.createReader();
	directoryReader.readEntries(function(entries){
		var dirContent = $('#' + explorerDiv);
		dirContent.empty();
		
		if( (parentDir.name == 'sdcard' && currentDir.name != 'sdcard') || parentDir.name != 'sdcard' ) {
			$('#' + explorerDiv).append('<div class="ui-block-parent"><div><p><b><a href="#">parent folder</a></b></p></div></div>');
			$('#' + explorerDiv + ' .ui-block-parent div').bind('click', function() {
				if( parentDir != null ) listDir(parentDir);
				return false;
			});
		}
		
		var dirArr = new Array();
		var fileArr = new Array();
		for(var i=0; i<entries.length; ++i){ // sort entries
			var entry = entries[i];
			if( entry.isDirectory && entry.name[0] != '.' ) dirArr.push(entry);
			else if( entry.isFile && entry.name[0] != '.' ) fileArr.push(entry);
		}
		
		var sortedArr = dirArr.concat(fileArr); // sorted entries
		var uiBlock = ['a','b','c','d'];
		
		for(var i=0; i<sortedArr.length; ++i){ // show directories
			var entry = sortedArr[i];
			var blockLetter = uiBlock[i%4];
			//console.log(entry.name);
			if( entry.isDirectory )
				dirContent.append('<div class="ui-block-'+blockLetter+'"><div class="folder"><p>'+entry.name+'</p></div></div>');
			else if( entry.isFile && foldersOnly != true )
				dirContent.append('<div class="ui-block-'+blockLetter+'"><div class="file"><p>'+entry.name+'</p></div></div>');
		}
		$.mobile.hidePageLoadingMsg(); // hide loading message
		$(window).scrollTo( dirContent.parent() );
	}, function(error){
		console.log('listDir readEntries error: '+error.code);
	});
}

function readFile(fileEntry){
	if( !fileEntry.isFile ) console.log('readFile incorrect type');
	$.mobile.showPageLoadingMsg(); // show loading message
	
	fileEntry.file(function(file){
		var reader = new FileReader();
		reader.onloadend = function(evt) {
			//console.log("Read as Text");
			//console.log(evt.target.result); // show data from file into console
			on_read_file(evt);
		};
		reader.onerror = function(evt) {
			//console.log("Read as Text");
			//console.log(evt.target.result); // show data from file into console
			$('#loadFromSd_error').html(evt.target.error);
		};
		reader.readAsText(file);
		
		$.mobile.hidePageLoadingMsg(); // hide loading message
	}, function(error){
		console.log(evt.target.error.code);
	});
}

function writeFile(name){
	$.mobile.showPageLoadingMsg(); // show loading message
	
	currentDir.getFile(name, {create: true, exclusive: false}, function(file){
		file.createWriter(function(writer) {
		
			writer.onwriteend = function(evt) {
				//console.log("Read as Text");
				//console.log(evt.target.result); // show data from file into console
				on_write_file();
			};
			writer.onerror = function(evt) {
				//console.log("Read as Text");
				//console.log(evt.target.result); // show data from file into console
				// $('#saveToSd_error').html(evt.target.error);
			};
			writer.write($(to_save_input).val());
		}, function(error){
			console.log(error.code);
		});
		
		$.mobile.hidePageLoadingMsg(); // hide loading message
	}, function(error){
		console.log(evt.target.error.code);
	});
}

function openItem(name, type){
	if( type == 'd' && currentDir != null ){
		currentDir.getDirectory(name, {create:false},
			function(dir){ // success find directory
				activeItem = dir;
				activeItemType = type;
				listDir(activeItem);
			}, 
			function(error){ // error find directory
				console.log('Unable to find directory: '+error.code);
			}
		);
	} else if(type == 'f' && currentDir != null){
		currentDir.getFile(name, {create:false},
			function(file){ // success find file
				activeItem = file;
				activeItemType = type;
				readFile(activeItem);
			},
			function(error){ // error find file
				console.log('Unable to find file: '+error.code);
			}
		);
	}
}