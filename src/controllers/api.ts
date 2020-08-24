"use strict";

import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import { Url } from "../models/Url";


const shorten = (num: number) => {
	const mapAlphanumric = [
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
		'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
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

	const pathname:string[] = [];
	ds.forEach(r => {
		pathname.push(mapAlphanumric[r]);
	});

	return pathname.join("");
}

/**
 * Create a shorten urls
 * @route POST /api/v1/urls
 */
export const create = (req: Request, res: Response) => {
	const id = new mongoose.Types.ObjectId();
	const originalURL = req.body.originalURL;
	if (!/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(originalURL)) {
		return res.status(422).json({
			message: "Invalid original URL"
		});
	}

	const shortenURL = `${originalURL.startsWith("https") ? "https" : "http"}://pbid.io/${shorten(id.getTimestamp().getTime())}`;
	const url = new Url({
		_id: id,
		originalURL,
		shortenURL
	});

	url.save((err:any) => {
		if (err) {
			return res.status(402).json({
				message: "An error occurred",
				err
			});
		}

		return res.status(201).json({
			message: "URL successfully created",
			url
		});
	});
	
};

/**
 * List all the shorten urls
 * @route GET /api/v1/urls
 */
export const get = (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({
		message: "OK",
		urls: []
	})
};
