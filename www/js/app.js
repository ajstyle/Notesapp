( function()
{


//---------------Initialize-----------------------//
//-------------------------------------------------//
var notes = [];
var app = angular.module('Notesapp', ['ionic'])




//----------------Routing---------------------------//
//--------------------------------------------------//
app.config(function($stateProvider , $urlRouterProvider){


//-------------------List Notes Routing------------------------//

$stateProvider.state('list' , {
 
url : '/list' , 
templateUrl : 'templates/list.html' 
}) ; 


//--------------------Edit Notes Routing---------------------//

$stateProvider.state('edit' , {
 
url : '/edit/:noteId' , 
templateUrl : '/templates/edit.html', 
controller : "EditCtrl"
}) ; 

//--------------------Add Notes Routing---------------------//


$stateProvider.state('add' , {

url : '/add' ,
templateUrl : '/templates/edit.html', 

controller : "AddCtrl"
}) ; 

$urlRouterProvider.otherwise ('/list') ; 

}) ; 


//-------------------- Functions-----------------------------//
//-----------------------------------------------------------//


//------------------Get Notes--------------------------------//

function getNotes(noteId)
{
  for(var i = 0 ; i<notes.length ; i++ )
  {
    if(notes[i].id == noteId)
    {
       
       return notes[i] ; 
    }
  }
  return undefined ; 
}


//------------------------Update Notes---------------------//


function updateNotes(note)
{
  for(var i = 0 ; i<notes.length ; i++ )
  {
    if(notes[i].id == note.id)
    {  

       notes[i] = note ; 

       return notes[i] ; 
    }
  }
  return undefined ; 
}

 
//---------------------------Create Note----------------//

function createNote(note) 
{
   
  notes.push(note);
}


//------------------------Controllers--------------------------//
//---------------------------------------------------------------//


//-------------Add Controller--------------------------------//


app.controller('AddCtrl', function($scope  , $state) {

  
   $scope.note = {
     id : new Date().getTime().toString(),
     title : '' , 
     description : ''  
    };
 
  $scope.save = function(){

    createNote($scope.note) ; 
    $state.go('list') ; 
  }


});


//--------------List Controller----------------//

app.controller('appCtrl',  function($scope){
  
     $scope.notes = notes ;

});


//------------------------Edit Controller-------------------------//


app.controller('EditCtrl', function($scope  , $state) {
   //console.log($routeParams.param) ; 
   $scope.note = angular.copy(getNotes($state.params.noteId)) ;  
   
   $scope.save = function() {
      
      updateNotes($scope.note) ; 
      $state.go('list') ; 

  } ; 

});



  
//----------------------Edit Cordova-------------------//
//------------------------------------------------------//

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

     
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}
)();