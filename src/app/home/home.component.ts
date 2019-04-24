import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  listOfData=[];
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  cargando=false;
  constructor(private homeService:HomeService,private modalService: NzModalService,private message: NzMessageService) { }

  ngOnInit() {
    this.obtenerUsuarios();
    
  }

  obtenerUsuarios(){
    this.cargando=true;
    this.homeService.getUser().subscribe(user => {
      this.listOfData = user;
      this.listOfOption = user;
      this.cargando=false;
    })
  };

  showDeleteConfirm(key): void {
    this.modalService.confirm({
      nzTitle: 'Esta seguro que desea eliminarlo?',
      nzContent: '<b style="color: red;">Esta acción es irreversible</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.borrarUsuario(key),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  borrarUsuario(key){
    console.log('Borrar: ', key);
    const id = this.message.loading('Borrando usuario..', { nzDuration: 0 }).messageId;
    this.homeService.deleteUser(key).subscribe(res => {
      this.listOfTagOptions = this.listOfTagOptions.filter(d => d.key !== key);
      this.message.remove(id);
      this.listOfData = res.result;
      this.listOfOption = res.result;
      this.message.success(res.message, {
        nzDuration: 1500
      });})
  }
}
