(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59967ffe"],{"4c8a":function(t,s,e){},"61c6":function(t,s,e){"use strict";e("4c8a")},a31f:function(t,s,e){t.exports=e.p+"img/thanks.31c8ae23.jpg"},b84e:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"pagebanner pagebanner-img"}),e("div",{staticClass:"container checkorder"},[e("ul",{staticClass:"step"},[e("li",{staticClass:"step-item active",class:{"step-active":1===t.step}},[e("span",{staticClass:"d-block"},[t._v("STEP 1")]),t._v(" 確認購物清單 ")]),e("li",{staticClass:"step-item",class:{active:2===t.step||3===t.step,"step-active":2===t.step}},[e("span",{staticClass:"d-block"},[t._v("STEP 2")]),t._v(" 填寫訂購資料 ")]),e("li",{staticClass:"step-item",class:{active:3===t.step,"step-active":3===t.step}},[e("span",{staticClass:"d-block"},[t._v("STEP 3")]),t._v(" 付款/完成訂單 ")])]),3===t.step?e("div",[e("h2",{staticClass:"checkorder-title"},[t._v("訂單清單")]),e("div",{staticClass:"table-responsive-md mb-5"},[e("table",{staticClass:"table"},[e("tbody",t._l(t.order.products,(function(s,a){return e("tr",{key:a},[e("td",{staticClass:"align-middle text-nowrap"},[t._v(" "+t._s(s.product.title)+" ")]),e("td",{staticClass:"align-middle text-center text-nowrap"},[t._v(" "+t._s(s.quantity)+" / "+t._s(s.product.unit)+" ")]),e("td",{staticClass:"d-none d-sm-table-cell align-middle text-right"},[t._v(" "+t._s(t._f("currency")(s.product.price*s.quantity))+" ")])])})),0),e("tfoot",{staticClass:"bg-light table-borderless border-top"},[t.order.coupon?e("tr",{staticClass:"text-success"},[e("td",{staticClass:"d-none d-sm-table-cell"}),e("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v("已使用折價劵 - ["+t._s(t.order.coupon.title)+"]")])]):t._e(),e("tr",[e("td",{staticClass:"d-none d-sm-table-cell"}),e("td",{staticClass:"text-right"},[t._v("應付金額")]),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("currency")(t.order.amount)))])])])])]),e("h2",{staticClass:"checkorder-title"},[t._v("訂購資訊")]),e("div",{staticClass:"table-responsive-md order-table"},[t.order.user?e("table",{staticClass:"table"},[e("tr",[e("th",{staticClass:"text-nowrap",attrs:{scope:"row",width:"150"}},[t._v("收件人")]),e("td",[t._v(t._s(t.order.user.name))])]),e("tr",[e("th",{staticClass:"text-nowrap",attrs:{scope:"row",width:"150"}},[t._v("電子信箱")]),e("td",[t._v(t._s(t.order.user.email))])]),e("tr",[e("th",{staticClass:"text-nowrap",attrs:{scope:"row",width:"150"}},[t._v("電話")]),e("td",[t._v(t._s(t.order.user.tel))])]),e("tr",[e("th",{staticClass:"text-nowrap",attrs:{scope:"row",width:"150"}},[t._v("地址")]),e("td",[t._v(t._s(t.order.user.address))])]),e("tr",[e("th",{staticClass:"text-nowrap",attrs:{scope:"row",width:"150"}},[t._v("支付方式")]),e("td",[t._v(t._s(t.order.payment))])]),e("tr",[e("th",{staticClass:"text-nowrap",attrs:{scope:"row",width:"150"}},[t._v("備註")]),e("td",[t._v(t._s(t.order.message))])]),e("tr",[e("th",{staticClass:"text-nowrap",attrs:{scope:"row",width:"150"}},[t._v("付款狀態")]),e("td",{directives:[{name:"show",rawName:"v-show",value:t.order.paid,expression:"order.paid"}],staticClass:"text-success"},[t._v("已付款")]),e("td",{directives:[{name:"show",rawName:"v-show",value:!t.order.paid,expression:"!order.paid"}]},[t._v("未付款")])])]):t._e()]),t.order.paid?t._e():e("div",{staticClass:"text-center"},[e("a",{staticClass:"btn btn-secondary btn-lg",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.payOrder(t.orderId)}}},[t._v(" 確認付款 "),t._m(0)])])]):t._e()])])},r=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"ml-1"},[e("i",{staticClass:"fas fa-money-check-alt"})])}],o=(e("99af"),e("a31f")),c=e.n(o),i={name:"Order",data:function(){return{step:3,orderId:"",order:{}}},methods:{getOrder:function(t){var s=this,e="".concat("https://course-ec-api.hexschool.io/api","/").concat("bd65c2e1-90a0-48f8-a51f-dfe3857be113","/ec/orders/").concat(t);s.$store.dispatch("updateLoading",!0,{root:!0}),s.$http.get(e).then((function(t){s.order=t.data.data,s.$store.dispatch("updateLoading",!1,{root:!0})})).catch((function(){s.$store.dispatch("updateLoading",!1,{root:!0}),s.$swal({title:"發生錯誤",text:"找不到此訂單，將返回首頁",confirmButtonColor:"#dc3545",allowOutsideClick:!1,confirmButtonText:"確認",customClass:{title:"swal-title swal-title-danger"}}).then((function(){s.$router.push("/")}))}))},payOrder:function(t){var s=this,e="".concat("https://course-ec-api.hexschool.io/api","/").concat("bd65c2e1-90a0-48f8-a51f-dfe3857be113","/ec/orders/").concat(t,"/paying");s.$store.dispatch("updateLoading",!0,{root:!0}),s.$http.post(e).then((function(){s.$store.dispatch("updateLoading",!1,{root:!0}),s.getOrder(t),s.$swal({title:"付款成功",text:"我們已收到您的訂單，感謝您的購買!",showCancelButton:!1,confirmButtonColor:"#343a40",allowOutsideClick:!1,confirmButtonText:"確認",imageUrl:c.a,customClass:{title:"swal-title swal-title-secondary"}}).then((function(){s.$router.push("/")}))})).catch((function(){s.$store.dispatch("updateLoading",!1,{root:!0});var t={icon:"error",title:"付款失敗"};s.$store.dispatch("alertMessageModules/openToast",t)}))}},created:function(){var t=this,s=t.$route.params.orderId;s?(t.getOrder(s),t.orderId=s):t.$router.push("/")}},d=i,n=(e("61c6"),e("2877")),l=Object(n["a"])(d,a,r,!1,null,"c8b3c49e",null);s["default"]=l.exports}}]);
//# sourceMappingURL=chunk-59967ffe.cb33975d.js.map