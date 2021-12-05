/**
 * Create a unique ID based on a supplied format
 * @param {string} format How to define: Type--# symbol for numbers, A for capital letters, a for lower case letters...use brackets to specify number of characters[#]...use any other character as a seperator for blocks of characters. Example: #[3]A[2]+#[2] would equate to 418LS+48
 * @returns {string} unique ID
 */
 export function uniqueID(format:string): string {
    // capture returned id
    var id:string;

    //captures types of number
    const Num:number = 0;
    const Upper:number = 1;
    const Lower:number = 2;

    //process variables
    var format_type:number = -1;
    var number_string:string = "";
    var start_char:boolean = false;
    var times:number;
    var characters:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    //iterate through format string
    for (var i:number; i<format.length; i++) {
        var next_char:string = format[i];
        switch(next_char) {
            case '#':   //deal with numbers
                format_type=Num;
                break;
            case 'A':   //deal with capitals
                format_type=Upper;
                break;
            case 'a':   //deal with lowercase
                format_type=Lower;
                break;
            case '[':   //start a number
                start_char=true;
                break;
            case '0':   //deal with numbers
            case '1':  
            case '2': 
            case '3':   
            case '4':   
            case '5':   
            case '6':  
            case '7':   
            case '8':   
            case '9':  
                if(start_char) number_string += next_char;
                break;
            case ']':   //end the number
                if(start_char) {
                    times = Number(number_string);
                    start_char=false;
                    number_string="";

                    //serve a random number or letter
                    if(format_type == Num) {
                        for(var j:number=1; j<=times; j++) {
                            id += Math.floor(Math.random()*10).toString();
                        }
                    } else if(format_type == Upper) {
                        for(var j:number=1; j<=times; j++) {
                            id += characters[Math.floor(Math.random()*26)];
                        }
                    } else if(format_type == Lower) {
                        for(var j:number=1; j<=times; j++) {
                            id += characters[Math.floor(Math.random()*26+26)];
                        }
                    }

                    format_type=-1;
                }
                break;
            default:
                id += next_char;
                break;
        }
      }
    return id;
  }

