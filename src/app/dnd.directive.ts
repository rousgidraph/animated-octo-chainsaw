import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';



@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }


  //dragover listener
  @HostListener('dragover',['$event']) onDragOver(evt: Event){
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true ;


    console.log('drag over ');
  }

  //Dragleaver listener
  @HostListener('dragleave',['$event']) public onDragLeave(evt: Event){
    evt.preventDefault();
    evt.stopPropagation();

    console.log('drag leave');
  }

  //drop listener 
  @HostListener('drop',['$event']) public onDrop(evt : DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false ;
    let files = evt.dataTransfer!.files;

    if(files.length > 0){
      
      //do what you have to with the files 
      for(var i=0;i<files.length;i++){
        let curr:File = files[i];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
          var textFromFile = fileLoadedEvent.target?.result;
          console.log(textFromFile);
          
        }
        fileReader.readAsText(curr,"UTF-8");

      }
      
      console.log(`you have dropped ${files.length} files.`);
      
    }

    
  }

}
