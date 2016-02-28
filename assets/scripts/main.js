//
// Main JavaScript file
// --------------------------------------------------------

(function(window){
  var API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwo5Wg3o_z3tf9Cr6v9Y95fD9_aiBnQ5UUzJGyoJQe8K1_-oCs/exec';
  var WORKSHOP = 'git-20160326';

  document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
      initialize();
    }
  }

  function initialize(){
    setupForm({action: API_ENDPOINT}, {sheet_name: WORKSHOP});
    displayAttendees("attendees", attendees);
  }

  function setupForm(options, defaultParams){
    var queryData = getQueryJSON();
    defaultParams = _.extend({}, defaultParams, _.omit(queryData, 'role'));
    Tito.on('registration:finished', _.partial(handleTitoComplete, options, defaultParams));
  }

  function handleTitoComplete(options, defaultParams, data){
    var people = _.each(data.tickets, function(ticket){
      var person = makePerson(data, ticket, defaultParams);
      submitForm(options, person);
    });
  }

  function makePerson(data, ticket, defaultParams){
    var person = {
      role: ticket.release_title,
      name: data.name,
      email: data.email
    };
    if(!_.isEmpty(ticket.answers)){
      person.github = ticket.answers[0].response;
    }
    _.extend(person, defaultParams);
    return person;
  }


  function submitForm(options, defaultParams){
    var formData, formSubmit;

    formData = getFormData(null, defaultParams);

    formSubmit = new XMLHttpRequest();
    formSubmit.addEventListener("load", submitComplete);
    formSubmit.open("POST", options.action, true);
    formSubmit.send(formData);
  }

  function submitComplete(response){}

  function getFormData(form, defaultParams){
    var formData = new FormData(form);
    _.each(defaultParams, function(itemValue, itemName){
      formData.append(itemName, itemValue);
    });

    return formData;
  }

  function getQueryJSON() {
    var queries = location.search.slice(1).split('&');
    var result = {};

    queries.forEach(function(query) {
      query = query.split('=');
      result[query[0]] = decodeURIComponent(query[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
  }

}(window))