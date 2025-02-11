const MeetingHistory = require('../../model/schema/meeting');
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(201).send(meeting);
    } catch (error) {
        res.status(400).send(error);
    }
};

const index = async (req, res) => {
    try {
        const meetings = await MeetingHistory.find({});
        res.status(200).send(meetings);
    } catch (error) {
        res.status(500).send(error);
    }
};

const view = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findById(req.params.id);
        if (!meeting) {
            return res.status(404).send();
        }
        res.status(200).send(meeting);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteData = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findByIdAndDelete(req.params.id);
        if (!meeting) {
            return res.status(404).send();
        }
        res.status(200).send(meeting);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteMany = async (req, res) => {
    try {
        const result = await MeetingHistory.deleteMany({ _id: { $in: req.body.ids } });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { add, index, view, deleteData, deleteMany };