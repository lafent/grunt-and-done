/**
 * @author: Lee Fent <lee.fent@gmail.com>
 * @date: 06-April-2014
 */
// Used to selectively highlight the "active" menu item from the list below.
$(document).ready(function() {
  // Activate Tablesorter on targetted tables
  $("table.table-sortable").tablesorter();

  // Setup a simple tweak to auto-activate the top menu.
  var locationMap = {
    'index': 'home',
    'about': 'about',
    'contact': 'contact'
  };
  var currentLocation = window.location.href.split('/');
  var currentPage = currentLocation[currentLocation.length-1];
  var loc = currentPage.split('.html')[0];
  if (loc == '') {
    loc = 'index';
  }
  var element = $('li#' + locationMap[loc]);
  $('li#' + locationMap[loc]).addClass('active');
});

