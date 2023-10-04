import { Pipe, PipeTransform}  from '@angular/core';


// Pipe DECORATOR
@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {
    
    transform (value: string, character: string): string {

        return value.replace(character, ' ');
    }
    
    
}