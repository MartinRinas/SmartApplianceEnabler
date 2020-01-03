import {TopMenu} from './page/top-menu.page';
import {SideMenu} from './page/side.menu.page';
import {Appliance} from './page/appliance.page';
import {heatPump} from './fixture/appliance/heatpump';
import {baseUrl} from './page/page';
import {S0MeterPage} from './page/meter/S0-meter.page';
import {s0Meter} from './fixture/meter/S0Meter';
import {generateApplianceId} from './shared/appliance-id-generator';
import {SwitchPage} from './page/control/switch.page';
import {switch_} from './fixture/control/Switch';

fixture('Heat pump').page(baseUrl());

const applianceId = generateApplianceId();

test('Create appliance', async t => {
  await TopMenu.clickAppliances(t);
  await SideMenu.clickNewAppliance(t);
  await Appliance.setId(t, applianceId);
  await Appliance.setVendor(t, heatPump.vendor);
  await Appliance.setName(t, heatPump.name);
  await Appliance.setType(t, heatPump.type);
  await Appliance.setSerial(t, heatPump.serial);
  await Appliance.setMaxPowerConsumption(t, heatPump.maxPowerConsumption);
  await Appliance.setInterruptionsAllowed(t, true);
  await Appliance.setMinOnTime(t, heatPump.minOnTime);
  await Appliance.setMaxOnTime(t, heatPump.maxOnTime);
  await Appliance.setMinOffTime(t, heatPump.minOffTime);
  await Appliance.setMaxOffTime(t, heatPump.maxOffTime);
  await Appliance.clickSave(t);

  await t.expect(SideMenu.appliance(applianceId).exists)
    .ok('The appliance created should show up in the side menu', { timeout: 10000 });
});

test('Create meter', async t => {
  await TopMenu.clickAppliances(t);
  await SideMenu.clickMeter(t, applianceId);
  await S0MeterPage.setTypeS0(t);
  await S0MeterPage.setGpio(t, s0Meter.gpio);
  await S0MeterPage.setPinPullResistance(t, s0Meter.pinPullResistance);
  await S0MeterPage.setImpulsesPerKwh(t, s0Meter.impulsesPerKwh);
  await S0MeterPage.setMeasurementInterval(t, s0Meter.measurementInterval);
  await S0MeterPage.clickSave(t);
});

test('Create control', async t => {
  await TopMenu.clickAppliances(t);
  await SideMenu.clickControl(t, applianceId);
  await SwitchPage.setTypeSwitch(t);
  await SwitchPage.setGpio(t, switch_.gpio);
  await SwitchPage.setReverseStates(t, switch_.reverseStates);
  await SwitchPage.clickSave(t);
});
