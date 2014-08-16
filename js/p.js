"use strict";

function OrderFree() {
  this.animate = "fadeOut" || "";

}

OrderFree.prototype.hideModal = function () {
  $(".modal").fadeOut();
  $(".modal-backdrop").remove();
};

OrderFree.prototype.showModal = function () {

  var $body = $(document.body);
  $(".modal").fadeIn();
  var $backdrop = $('<div class="modal-backdrop ' + this.animate + '" />');
  $backdrop.appendTo($body).addClass('in');
};

OrderFree.prototype.validate = function () {
  var $form = $("#orderForm");
  var $companyName = $form.find("#companyName");
  var $storeLocation = $form.find('#storeLocation');
  var $error;

  if ($companyName.val() === "" || $storeLocation.val() === "") {
    this.clearMsg();
    $error = $('<p class="alert alert-danger">信息请补完整</p>');
    $error.insertAfter($form);
    return false;
  }
  return true;
};

OrderFree.prototype.clearMsg = function () {
  $('.alert-danger').remove();
  $('.alert-danger').remove();
};

OrderFree.prototype.orderSuccessModal = function () {
  $("#orderForm").hide();
  $(".order-success").show();
};

//写个随机数来模拟 可预约 不可预约 这两种状态
OrderFree.prototype.orderRandom = function (n, m) {
  return Math.floor(Math.random() * (n - m) + m);
};

OrderFree.prototype.orderDisabled = function () {
  this.showModal();
  var $form = $('#orderForm');
  $form.addClass('order-free-disabled');
  $form.find('input').prop('disabled', true);
  $form.find('.pure-button-error').show();
};

OrderFree.prototype.orderAble = function () {
  var $form = $('#orderForm');
  $form.removeClass('order-free-disabled');
  $form.find('input').prop('disabled', false);
  $form.find('.pure-button-error').hide();
};

var or = new OrderFree();

$("#orderFreeBtn").on('click', function () {


  var orderable = or.orderRandom(0, 100);
  if (orderable <= 50) {
    //可以约
    console.log("可以");
    or.showModal();
    or.orderAble();
  } else {
    //不能约
    console.log("不能");
    or.orderDisabled();
    or.clearMsg();
  }

});

$("button.close").on('click', function () {
  or.hideModal();
});

$("#orderButton").on('click', function () {
  if (or.validate()) {
    or.clearMsg();
    or.orderSuccessModal();
  }
});


var bindOrderFreeForm = function () {
  var $form = $("#orderForm");
  $form.find('#orderButton').on('click', function () {


    if (validate()) {
      var url = $form.attr('action');
      var type = $form.attr('method') || "GET";
      var ajaxOpts = {
        type: type,
        url: url,
        //data: $form.serialize(),
        success: function (result) {
          var $info;
          if (result.status.toUpperCase() === 'SUCCESS') {
            clearMessages();
            $form2.show();
            hideForm1($form);
          } else {
            clearMessages();
            $info = $('<p class="alert alert-danger">' + result.message + '</p>');
            $info.insertBefore($form);
          }
        },
        error: function () {
          clearMessages();
          var $info = $('<p class="alert alert-danger">提交失败，请重新输入正确的信息以提交。</p>');
          $info.insertBefore($form);
        }
      };
      $.ajax(ajaxOpts);
    }
    return false;
  });

};

var init = function () {
  bindOrderFreeForm();
};

$(function () {
  init();
});


