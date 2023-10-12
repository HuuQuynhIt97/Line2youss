"use strict";
// import { SystemConfigService } from "../_service/systemconfig.service";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sysConfInitializer = void 0;
function sysConfInitializer(sysConfService) {
    return function () {
        return sysConfService.loadDataSystem().toPromise().then(function (data) {
            localStorage.setItem('sysConf', JSON.stringify(data));
        });
    };
}
exports.sysConfInitializer = sysConfInitializer;
