"use strict";

import graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import { UserDocument } from "../models/User";
import { Z_ASCII } from "zlib";


const shorten = (num: number) => {
	const mapAlphanumric = [
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
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
 * List of API examples.
 * @route GET /api
 */
export const getApi = (req: Request, res: Response) => {
    res.render("api/index", {
        title: "API Examples"
    });
};

/**
 * Facebook API example.
 * @route GET /api/facebook
 */
export const getFacebook = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument;
    const token = user.tokens.find((token: any) => token.kind === "facebook");
    graph.setAccessToken(token.accessToken);
    graph.get(`${user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
        if (err) { return next(err); }
        res.render("api/facebook", {
            title: "Facebook API",
            profile: results
        });
    });
};
