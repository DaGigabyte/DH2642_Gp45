import { reaction } from "mobx";

export default function settingsReaction(model) {
    console.debug("settingsReaction");
    function watchUserCB() {
        return [model.user.data];
    }
    function copyUserToUserSettingsDataCB() {
        console.debug("model.user.data changed, copying to model.userSettingsData.data");
        model.userSettingsData.setFullName(model.user.data.fullName);
        model.userSettingsData.setDisplayName(model.user.data.displayName);
    }
    reaction(watchUserCB, copyUserToUserSettingsDataCB);
}