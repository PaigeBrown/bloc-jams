var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     var $row = $(template);

     var clickHandler = function() {
       var songNumber = parseInt($(this).attr('data-song-number'));
      console.log("test1");
       if (setSong !== null) {
         var currentlyPlayingCell = getSongNumberCell(setSong);
         currentlyPlayingCell.html(setSong);
       } if (setSong !== songNumber) {
               $(this).html(pauseButtonTemplate);
               currentlyPlayingSong = songNumber;
               setSong = currentAlbum.songs[songNumber - 1];
       } else if (setSong === songNumber) {
               console.log("test");
               $(this).html(playButtonTemplate);
               setSong = null;
               setSong = null;
       }
    };

     var onHover = function(event) {
         var songNumberCell = parseInt($(this).find('.song-item-number'));
         var songNumber = $(songNumberCell).attr('data-song-number');

         if (songNumber !== setSong) {
             $(songNumberCell).html(playButtonTemplate);
         }
     };
     var offHover = function(event) {
         var songNumberCell = parseInt($(this).find('.song-item-number'));
         var songNumber = $(songNumberCell).attr('data-song-number');

         if (songNumber !== setSong) {
             $(songNumberCell).html(songNumber);
         }
         console.log("songNumber type is " + typeof songNumber + "\n and setSong type is " + typeof setSong);
     };


     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
};

var setCurrentAlbum = function(album) {

  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.song.indexOf(song);
};

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, setSong);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    var lastSongNumber = setSong;

    setSong = currentSongIndex + 1;
    setSong = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell(setSong);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong =function() {
    var currentSongIndex = trackIndex(currentAlbum, setSong);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = setSong;

    setSong = currentSongIndex + 1;
    setSong = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(setSong);
   var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

   $previousSongNumberCell.html(pauseButtonTemplate);
   $lastSongNumberCell.html(lastSongNumber);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var currentAlbum = null;
var setSong = null;
var setSong = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

// var updatePlayerBarSong = function() {
//   if (setSong !== songNumber) {
//            $(this).html(pauseButtonTemplate);
//            setSong = songNumber;
//            setSong = currentAlbum.songs[songNumber - 1];
//            updatePlayerBarSong();
//   } else if (setSong === songNumber) {
//            $(this).html(playButtonTemplate);
//            $('.main-controls .play-pause').html(playerBarPlayButton);
//            setSong = null;
//            setSong = null;
//    }
// };

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    var albums = [albumPicasso, albumMarconi, albumDurer];
    var index =1;
    $('.album-cover-art').click(function(event){
      setCurrentAlbum(albums[index]);
      index++;
      if (index ==albums.length){
        index=0;
      }
    });
});

console.log("songNumber type is " + typeof songNumber + "\n and setSong type is " + typeof setSong);

var setSong = function(songNumber) {
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber -1];
};

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};
