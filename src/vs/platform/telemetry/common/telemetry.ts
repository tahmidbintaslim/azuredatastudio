/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { ClassifiedEvent, StrictPropertyCheck, GDPRClassification } from 'vs/platform/telemetry/common/gdprTypings';

export const ITelemetryService = createDecorator<ITelemetryService>('telemetryService');

export interface ITelemetryInfo {
	sessionId: string;
	machineId: string;
	instanceId: string;
	msftInternal?: boolean;
}

export interface ITelemetryData {
	from?: string;
	target?: string;
	[key: string]: any;
}

export interface ITelemetryService {

	_serviceBrand: undefined;

	/**
	 * Sends a telemetry event that has been privacy approved.
	 * Do not call this unless you have been given approval.
	 */
	publicLog(eventName: string, data?: ITelemetryData, anonymizeFilePaths?: boolean): Promise<void>;

	publicLog2<E extends ClassifiedEvent<T> = never, T extends GDPRClassification<T> = never>(eventName: string, data?: StrictPropertyCheck<T, E>, anonymizeFilePaths?: boolean): Promise<void>;

	publicLogError(errorEventName: string, data?: ITelemetryData): Promise<void>;

	publicLogError2<E extends ClassifiedEvent<T> = never, T extends GDPRClassification<T> = never>(eventName: string, data?: StrictPropertyCheck<T, E>): Promise<void>;

	setEnabled(value: boolean): void;

	getTelemetryInfo(): Promise<ITelemetryInfo>;

	isOptedIn: boolean;
}

// Keys
export const instanceStorageKey = 'telemetry.instanceId';
export const currentSessionDateStorageKey = 'telemetry.currentSessionDate';
export const firstSessionDateStorageKey = 'telemetry.firstSessionDate';
export const lastSessionDateStorageKey = 'telemetry.lastSessionDate';
export const machineIdKey = 'telemetry.machineId';
export const trueMachineIdKey = 'telemetry.trueMachineId';
export const crashReporterIdStorageKey = 'crashReporter.guid';
