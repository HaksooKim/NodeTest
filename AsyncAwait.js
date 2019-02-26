var resolveAfter2Seconds = function(){
	console.log("starting slow promise");
	return new Promise(r => {
		setTimeout(function(){
			r(20);
			console.log("slow promise is done");
		}, 2000);
	});
};

var resolveAfter1Second = function(){
	console.log("starting fast promise");
	return new Promise(resolve =>{
		setTimeout(function(){
			resolve(10);
			console.log("fast promise is done");
		}, 1000);
	});
};

var sequentialStart = async function(){
	console.log('==SEQUENTIAL START==');
	
	// slow에 값이 넘어 온다음 fast가 진행됨.
	const slow = await resolveAfter2Seconds();
	const fast = await resolveAfter1Second();
	
	console.log(slow);
	console.log(fast);
}

var concurrentStart = async function(){
	console.log('==CONCURRENT START with await==');
	const slow = resolveAfter2Seconds();
	const fast = resolveAfter1Second();
	
	// 만약 await가 없으면 slow, fast에 값이 넘어오기전에 수행되므로 Pending으로 찍힘
	// await가 있기 때문에 위 두 함수가 동시에 실행이 되어도 slow에 값이 넘어오면 로그가 찍히고
	// 그다음 fast가 찍힌다.
	console.log(await slow);
	console.log(await fast);
}

var stillConcurrent = function(){
	console.log('==CONCURRENT START with Promise.all==');
	// Promise.all는 모든 함수 호출이 다 끝난 다음 다음 작업이 진행
	Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
		console.log(messages[0]);
		console.log(messages[1]);
	});
}

var parallel = function(){
	console.log('==PARALLEL with Promise.then==');
	resolveAfter2Seconds().then((message)=>console.log(message));
	resolveAfter1Second().then((message)=>console.log(message));
}

sequentialStart();
setTimeout(concurrentStart, 4000);
setTimeout(stillConcurrent, 7000);
setTimeout(parallel, 10000);