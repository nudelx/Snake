var Snake =(function($){

	var Snake = {
			
			
			defConf: {
					
					resultBox:'div.result',
					borderColor:'#E6E6E6',
					backColor:'#F2F2F2',
					textColor:'#292929',
					number: 0
					
					
					
			},
			
			boxHandler: null,
			theNumber : null,
			snakeHolderId:'snakeHolder',
			cellWidth: 50,
			maxValue:15,
			timerInterval:500,
			
			init: function(config){
				
				$.extend(this.defConf,config);
				 this.boxHandler = $(this.defConf.resultBox);
				 this.theNumber  = parseInt(config.number);
				 this.boxHandler.empty();
				 // console.dir(this);
				 $('#Sdone').remove();
				 
				 this.buildMatrix();
				 
			},
			
			buildMatrix: function(){
				
				var e = $('div#snakeError');
				if(e.length){e.remove();}
				
				if(this.theNumber <= 0 || !this.boxHandler || isNaN(this.theNumber)){
					this.displayError();
					return;
				}
				this.theNumber  = (this.theNumber>this.maxValue)?(this.maxValue):(this.theNumber); 	
				
				this.createBox();
				this.buildCells();
				
				
											
				
				
			},
			
			createBox: function(){
				
				var width = ( (this.theNumber*this.cellWidth)+(this.theNumber*2));
				
				var box = $('<div id="'+this.snakeHolderId+'"></div>')
				.css({
					'border':'1px solid #E6E6E6',
					'margin-left':'auto',
					'margin-right':'auto',
					'text-align':'left',
					'width' : width+'px',
					'height': width+'px',
					'display':'none',
					
					
				}).appendTo(this.boxHandler).fadeIn();
				
				
			},
			
			buildCells: function(){
				
//				console.dir(this);
				
				for(var i=0;i<Math.pow(this.theNumber,2);i++){
					$('<div id="'+'cell_'+i+'">&#9786</div>')
					.css({
						'width':(this.cellWidth)+'px',
						'height':(this.cellWidth)+'px',
						'background-color':this.defConf.backColor,
						'border':'1px solid '+this.defConf.borderColor,
						'display':'inline-block',
						'vertical-align': 'middle',
		                'text-align': 'center',
		                'line-height': this.cellWidth+'px',
		                
					})
					.appendTo('#'+this.snakeHolderId);
				}
				
				this.fillCells();
				
			},
			
			
			fillCells: function(){

				var self = this;  //closure
				var cellsNum = Math.pow(self.theNumber,2);
				var counter = 0;
				var index = counter;
				var ptr = 0;
				var masterNum = self.theNumber;

				var STEPS = {};
				STEPS.totNumber  = masterNum;
				STEPS.offset = 1
				STEPS.right  = STEPS.totNumber;
				STEPS.down 	 = STEPS.right-STEPS.offset;
				STEPS.left 	 = STEPS.down;
				STEPS.up 	 = STEPS.down-STEPS.offset;
				STEPS.offset++;
				
				
				
				setTimeout(function(){
					
					
					// var startCell = $('#cell_'+(self.theNumber-1)).css({
					// 	'background-color':'yellow',
					// });
					
					


					var timer = setInterval(function(){
						
						if(counter >= cellsNum-1){
							clearInterval(timer);
							self.displayDone();
						}
			

						if(STEPS.right>0){
							STEPS.right--;
							ptr++;
							
						}else if(STEPS.down>0){
							STEPS.down--;
							ptr+=masterNum;
						}else if(STEPS.left>0){
							STEPS.left--;
							ptr--;
						}else if(STEPS.up>0){
							ptr-=masterNum;
							STEPS.up--;

						}

						if(STEPS.right+STEPS.left+STEPS.down+STEPS.up == 0){
							
							
							
							STEPS.right = STEPS.totNumber-STEPS.offset;
							STEPS.down 	= STEPS.right-1;
							STEPS.left 	= STEPS.right-1;
							STEPS.up 	= STEPS.left-1;
							STEPS.offset+=2;
							
							// console.log("RIGHT:"+STEPS.right+UP:"+STEPS.up+" DOWN:"+STEPS.down+"LEFT:"+STEPS.left+""ROUND:"+STEPS.round);

						}
						
						self.setValue(ptr,counter);
						counter++;
						
					},self.timerInterval);
					
					
					
				},self.timerInterval); 
				
				
				
			},
			
			
			setValue: function(index,value){

				// console.log("PTR:" + index);
				$('#cell_'+(index-1)).css({'background-color':'#3366FF','color':'#fff'}).html(value+1);

			},
			
			displayError:function(){
				
				
				var msg = $('<p></p>',{
					 text: 'oops... something went wrong !',
				}).css({
					
					'color':'#FF3366',
					'font-weight': '700',
					
				});
				
				
				var error = $('<div id="snakeError"></div>')
				.css({
					'border':'1px solid #E6E6E6',
					'margin':'auto',
					'width':'300px',
					'text-align':'center',
					'background-color':'#F2F2F2',
					'margin-top': '20px',
					'margin-bottom': '20px',
					'padding': '10px 5px'
				}).append(msg);
				
				$('body').prepend(error);
				
			},


			displayDone:function(){
				var done  = $('<div id="Sdone"></div>').css({

					'width':'300px',
					'padding': '20px 10px ',
					'color':'#3366FF !important',
					'font-size': '30px',
					'text-align':'center',
					'margin-right':'auto',
					'margin-left':'auto',


				});
				var p = $('<p> The End  </p>').css({
					'color':'#3366FF',
				});
				done.append(p).appendTo('body');
				
			}

			
	}
	
	
	return Snake;
	
})(jQuery)

