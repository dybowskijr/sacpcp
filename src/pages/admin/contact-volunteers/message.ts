import { Component } from '@angular/core';
import { App, NavParams } from 'ionic-angular';
import { MessageServices } from '../../../lib/service/message';
import { UserServices } from '../../../lib/service/user';
import { ViewController } from 'ionic-angular';
import { HomePage } from '../../home/home';

@Component({
	templateUrl: 'message.html'
})

export class Message {
	public message:String = '';
	public sendMessageError:Boolean;
    list: Array<any>[];
	listType: string;

	constructor(params: NavParams,
				public viewCtrl:ViewController,
				private messageServices:MessageServices,
				private app:App) {

		this.listType = params.get('listType');
		this.list = params.get('list');
		console.log("list: " + this.list);
	}

	cancel() {
		this.viewCtrl.dismiss({'cancel':true});
	}

	send() {
		let apiCall = null;
		let payload = {
			'message': this.message,
			'schedule_option': 2
		}
		switch(this.listType) {
			case 'individual':
				payload['recipients'] = this.list;
				apiCall = this.messageServices.sendMessageToUsersList;
				break;
			case 'groups':
				// TODO
				break;
			case 'events':
			default:
			    //apiCall = this.messageServices.
				break;
		}
		console.log("payload: " + JSON.stringify(payload));
		apiCall(payload).subscribe(
			response => {
				console.log(response);
				this.viewCtrl.dismiss({
					'success': response, 
					'message': 'Sent message to selected volunteer(s).'
				});
			},
			error => {this.sendMessageError = true }
		);
	}
}
