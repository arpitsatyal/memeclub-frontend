import { Injectable } from "@angular/core";
import * as moment from 'moment'
@Injectable()

export class MomentService {
    timeFromNow(time) {
        return moment(time).fromNow()
    }
}