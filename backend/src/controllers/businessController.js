import { Request, Response } from 'express';
import Business from '../models/Business';

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const business = await Business.create({
      ...req.body,
      owner: req.user._id
    });
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: 'Error creating business' });
  }
};

export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const businesses = await Business.find({})
      .populate('owner', 'name email');
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching businesses' });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Error updating business' });
  }
}; 