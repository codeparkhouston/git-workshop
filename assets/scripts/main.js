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
    setupForm('sign-up', {action: API_ENDPOINT}, {sheet_name: WORKSHOP});
    // getParticipants('whos-coming', {action: API_ENDPOINT}, {sheet_name: WORKSHOP});
  }

  function setupForm(formId, options, defaultParams){
    var form = document.getElementById(formId);
    if(!form){
      return;
    }
    var roles = form.querySelectorAll('[name=role]');
    var textareas = document.getElementsByTagName('textarea');
    var queryData = getQueryJSON();
    defaultParams = _.extend({}, defaultParams, _.omit(queryData, 'role'));

    handleForm(form, options, defaultParams);
    handleRoleChange(form, roles);
    handleTextareas(textareas);
    setDefaultRole(form, queryData.role);
  }

  function handleRoleChange(form, roles){
    Array.prototype.forEach.call(roles, function(role){
      role.addEventListener('change', function(clickEvent){
        if(this.checked){
          setRoleTo(form, this.value);          
        }
      });
    });
  }

  function setDefaultRole(form, role){
    if(!role){
      return;
    }

    var roleInput = form.querySelector('input[name=role][value='+role+']');
    roleInput.click();
  }

  function handleForm(form, options, defaultParams){
    var checkValid = _.debounce(_checkValid.bind(form), 100);

    form.addEventListener('submit', _.partial(submitForm, options, defaultParams));

    form.addEventListener('keyup', checkValid);
    form.addEventListener('change', checkValid);

    checkValid();
  }

  function _checkValid(){
    var valid = true;
    var form = this;
    var requiredInputs = form.querySelectorAll('[required]');
    var submitButton = form.querySelector('[type=submit]');

    Array.prototype.forEach.call(requiredInputs, function(input){
      if(input.type == 'radio' || input.type == 'checkbox'){
        if(isGroupValid(form, input.name)){
          setValidInput(input.parentNode);
        } else {
          valid = false;
          setInvalidInput(input.parentNode);
        }
      } else if(input.value.length == 0){
        valid = false;
        setInvalidInput(input);
      } else if(input.type == 'email' && !validateEmail(input.value)){
        valid = false;
        setInvalidEmail(input);
      } else {
        setValidInput(input);
      }
    });

    function setValidInput(input){
      input.parentNode.parentNode.classList.add('valid');
      input.parentNode.parentNode.classList.remove('not-email');
    }

    function setInvalidInput(input){
      input.parentNode.parentNode.classList.remove('valid');
      input.parentNode.parentNode.classList.remove('not-email'); 
    }

    function setInvalidEmail(input){
      input.parentNode.parentNode.classList.add('not-email');
      input.parentNode.parentNode.classList.remove('valid');
    }

    function isGroupValid(form, name){
      var selected = form.querySelector('[name='+name+']:checked');
      if(selected){
        return selected.value.length > 0;
      }
      return false;
    }

    if(valid){
      submitButton.removeAttribute('disabled');
    } else if(!submitButton.disabled) {
      submitButton.setAttribute('disabled', true);
    }


  }

  function submitForm(options, defaultParams, submitEvent){
    var formData, formSubmit;
    submitEvent.preventDefault();

    setModeTo(this, 'submitting');
    formData = getFormData(this, defaultParams);

    formSubmit = new XMLHttpRequest();
    formSubmit.addEventListener("load", submitComplete.bind(null, this));
    formSubmit.open("POST", options.action, true);
    formSubmit.send(formData);
  }

  function setRoleTo(form, role){
    setFormData(form, 'role', role);
  }

  function setModeTo(form, mode){
    setFormData(form, 'mode', mode);
  }

  function setFormData(form, dataName, data){
    form.dataset[dataName] = data;
  }

  function getFormData(form, defaultParams){
    var formData = new FormData(form);
    _.each(defaultParams, function(itemValue, itemName){
      formData.append(itemName, itemValue);
    });

    return formData;
  }

  function submitComplete(form) {
    setModeTo(form, 'complete');
  }

  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function handleTextareas(textareas){
    Array.prototype.forEach.call(textareas, handleTextarea);

    function handleTextarea(textarea){
      textarea.addEventListener('keyup', autoResize);
    }

    function autoResize(keyEvent){
      var textareaHeight = this.getBoundingClientRect();
      if(this.scrollHeight > textareaHeight.height){
        this.style.height = '';
        this.style.height = this.scrollHeight + 20 + 'px';      
      }
    }
  }

  // function getParticipants(id, options, defaultParams){
  //   var iframe = document.getElementById(id);
  //   var getUrl = options.action + '?sheetname' + defaultParams.sheet_name;
  //   iframe.src = getUrl;
  //   var participantsGET = new XMLHttpRequest();
  //   participantsGET.addEventListener("load", function(response){
  //     console.info(response);
  //     console.info(this);
  //   });
  //   participantsGET.open("GET", options.action, true);
  //   participantsGET.withCredentials = true;
  //   participantsGET.send(defaultParams);
  // }


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