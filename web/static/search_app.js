var url = "http://localhost:8000"

console.log("hello world");
$('.search').on('click', function () {
  console.log("search button pressed");
  $.ajax({
    type: "POST",
    url: url,
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(format_search_query()),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){response_placement(data);},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
})


$('.hide').on('click', function () {
  $('p').fadeOut('slow')
})


$('.copy').on('click', function () {
        console.log("copy button pressed");
  			copyToClipboard(document.getElementById("result"));
      });



function copyToClipboard(elem) {
  // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
  } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);

  // copy the selection
  var succeed;
  try {
  	  succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
  }

  if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
      // clear temporary content
      target.textContent = "";
  }
  return succeed;
}

function format_search_query() {
  var search_text = $('#search_string').val();
  var domain = $('#domain').val();
  console.log({'search_string': search_text,
          'domain': domain});
  return {'search_string': search_text,
          'domain': domain}
}

function response_placement(data) {
  $( "#result" ).empty().append( data['text'] )
}
