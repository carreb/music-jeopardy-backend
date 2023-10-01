const router = require('express').Router();
const express = require('express');
const songs = require("../models/song");

router.get("/all", async (req, res) => {
    try {
        const allSongs = await songs.find();
        res.json(allSongs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/category/:category", async (req, res) => {
    try {
        const categorySongs = await songs.find({ category: req.params.category });
        res.json(categorySongs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/category/:category/:value", async (req, res) => {
    try {
        const categorySongs = await songs.find({ category: req.params.category, value: req.params.value });
        res.json(categorySongs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/add", async (req, res) => {
    const song = new songs({
        title: req.body.title,
        "start-time": req.body["start-time"],
        "end-time": req.body["end-time"],
        "file-name": req.body["file-name"],
        "category": req.body["category"],
        "value": req.body["value"]
    });
    try {
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", getSong, async (req, res) => {
    try {
        await res.song.remove();
        res.json({ message: "Deleted song" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const allSongs = await songs.find();
        let categories = [];
        for (let i = 0; i < allSongs.length; i++) {
            if (!categories.includes(allSongs[i].category)) {
                let category = {}
                category["category"] = allSongs[i].category;
                categories.push(category);
            }
        }
        for (let i = 0; i < categories.length; i++) {
            let categorySongs = await songs.find({ category: categories[i].category });
            let values = [];
            categories[i].id = i;
            for (let j = 0; j < categorySongs.length; j++) {
                if (!values.includes(categorySongs[j].value)) {
                    values.push(categorySongs[j].value);
                }
            }
            categories[i]["values"] = values;
        }
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/file/:id" , async (req, res) => {
    try {
        const song = await songs.findById(req.params.id);
        // return the audio file to the client
        res.sendFile(__dirname + "/../audio/" + song["file-name"]);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSong(req, res, next) {
    let song;
    try {
        song = await songs.findById(req.params.id);
        if (song == null) {
            return res.status(404).json({ message: "Cannot find song" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.song = song;
    next();
}


module.exports = router;