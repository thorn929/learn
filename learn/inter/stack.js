console.log(1);
 setTimeout(() => {
   console.log(2);
   setTimeout(() => {
     console.log(3);
     setTimeout(() => {
       console.log(4);
     }, 0) ;
   }, 0) ;
 }, 0);
 console.log('222222')
 setTimeout(() => {
   console.log(5);
   setTimeout(() => {
     console.log(6);
   }, 0);
 }, 0);
 console.log('ok');

// 1 ok 2 5 3 6 4
