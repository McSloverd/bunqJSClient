import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { sessionRegistration } from "../../TestHelpers/DefaultResponses";

let bunqApp: BunqJSClient;

describe("API", () => {
    beforeAll(async () => {
        moxios.install();

        // prepare certificates
        await Prepare();
        // create a bunqjsclient to be used in the tests
        bunqApp = await SetupApp("Schedule");

        moxios.uninstall();
    });

    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("Schedule", () => {
        it("#LIST", async () => {
            const request = bunqApp.api.schedule.list(1, 2);
            await sessionRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.schedule.list(1, 2, {
                newer_id: 1,
                older_id: 2,
                count: 200
            });
            await sessionRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});