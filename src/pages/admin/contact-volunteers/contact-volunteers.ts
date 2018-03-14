import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserServices } from '../../../lib/service/user';
import { VolunteerEventsService } from '../../../lib/service/volunteer-events-service';
import { ModalController } from 'ionic-angular';
import { Message } from './message';
import { OrganizationServices } from '../../../lib/service/organization';
import {MessageTargetList } from '../../../lib/components/message-target-list/message-target-list';

@Component({
  templateUrl: 'contact-volunteers.html'
})
export class ContactVolunteers implements AfterViewInit {
  
  constructor(public nav: NavController,
    public userServices: UserServices,
    public volunteerEventsService: VolunteerEventsService,
    public organizationService: OrganizationServices,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController) {

  }

  @ViewChild(MessageTargetList) messageTargetList: MessageTargetList;

  public sendTo: string;
  public users: Array<any> = [];
  public getUsersError: Boolean;
  public selectAllUsers: Boolean;
  public events: Array<any> = [];
  public getEventsError: Boolean;
  public selectAllEvents: Boolean;
  public selectAllGroups: boolean;
  public groups: Array<any> = [];

  ngOnInit() {
     this.sendTo = 'individual';
    // this.userServices.getAllUsers().subscribe(
    //   users => {
    //     for (var user of users) {
    //       if (user.contactmethod != null && user.first_name != '' && user.first_name != null)
    //         this.users.push(user);
    //     }
    //   },
    //   err => this.getUsersError = true,
    //   () => this.toggleSelectAllUsers(true)
    // );
    // this.volunteerEventsService.getVolunteerEvents().subscribe(
    //   events => {
    //     this.events = events;
    //   },
    //   err => this.getEventsError = true,
    //   () => this.toggleSelectAllEvents(true)
    // );
    // this.organizationService.getAllOrgNames().subscribe(
    //   groups => {
    //     console.log("Groups: " + JSON.stringify(groups));
    //     for (let g of groups) {
    //       if (g.status == 0)
    //         this.groups.push(g);
    //     }
    //   },
    //   err => {this.getGroupsError = true;}
    // );
  }

  back() {
    this.nav.pop();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();                                                    
  }


  checkSelected() {
    if (this.sendTo === 'individual') {
      return !this.users.some(user => user.selected);
    } else {
      return !this.events.some(event => event.selected);
    }
  }

  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }

public canSendMessage(): boolean {
    console.log("In canSendMessage()");
    return this.messageTargetList && this.messageTargetList.areSomeChecked();
}


openMessageModal() {
    
      let modal = this.modalCtrl.create(Message,
        {
          listType: this.sendTo,
          listing: this.messageTargetList.listItems
        });
      modal.present();
      modal.onDidDismiss(
        res => { if (!res.cancel) this.presentToast('Sent message to selected volunteer(s).') }
      );  
  }
}
