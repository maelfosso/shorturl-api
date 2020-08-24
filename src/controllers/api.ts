"use strict";

import { Response, Request, NextFunction } from "express";
import { UserDocument } from "../models/User";


const shorten = (num: number) => {
	const mapAlphanumric = [
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
		'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9
	];

	let ds:number[] = [];
	
	while (num > 0) {
		const remainder = num % 36;
		ds.push(remainder);
		num = Math.floor(num / 36);
	}
	ds = ds.reverse();
	if (ds.length < 8) {
		while (ds.length != 8) {
			ds.unshift(0);
		}
	}

	const pathname = [];
	ds.forEach(r => {
		pathname.push(mapAlphanumric[r]);
	});

	return ds.join();
}

/**
 * Create a shorten urls
 * @route POST /api/v1/urls
 */
export const create = (req: Request, res: Response) => {
	return res.json({
		message: "Url created"
	});
};

/**
 * List all the shorten urls
 * @route GET /api/v1/urls
 */
export const get = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
		message: "OK",
		urls: []
	})
};
