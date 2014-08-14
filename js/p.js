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
  $('.text-error').remove();
  $('.text-success').remove();
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

