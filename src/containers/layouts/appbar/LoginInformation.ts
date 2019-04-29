class LoginInformation {
    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get linkAvatar(): string {
        return this._linkAvatar;
    }

    set linkAvatar(value: string) {
        this._linkAvatar = value;
    }
    constructor(userName: string, linkAvatar: string) {
        this._userName = userName;
        this._linkAvatar = linkAvatar;
    }
    private _userName: string;
    private _linkAvatar: string;
}

export default LoginInformation;
