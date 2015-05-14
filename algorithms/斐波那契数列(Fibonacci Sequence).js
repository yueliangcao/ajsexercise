//tests
function test_1(){
  alert(f(10));
}
function test_高性能(){
  console.log('fe');
}

//递推公式
//f(0)=0 , f(1)=1
//f(n)=f(n-1)+f(n-2)
//n≥2 , n∈N*

function f(n){
	if(n<2) return n;
	return f(n-1) + f(n-2);
}

//此法无递归，效率高的多
function f3(n){
	var f0=0,f1=1,fn;

	if(n==0) return f0;
	if(n==1) return f1;

	for(var i=0; i<n-1; i++){
		fn = f0 + f1;
		f0 = f1;
		f1 = fn;	
	}

	return fn;
}

//递推公式
//f(0)=0 , f(1)=1 , f(2)=1
//f(n) = {[f(n-1)]^2 + (-1)^(n-1)} / f(n-2)
//n≥3 , n∈N*

function f2(n){
	if(n==0) return 0;
	if(n==1 || n ==2) return 1;
	return (Math.pow(f2(n-1),2) + Math.pow(-1,n-1)) / f2(n-2);
}
