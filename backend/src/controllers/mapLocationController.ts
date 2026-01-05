import { Request, Response } from 'express';
import { MapLocation } from '../models/MapLocation.js';
import type { IMapLocation, CreateMapLocationDTO, UpdateMapLocationDTO, ApiResponse } from '../types/index.js';

// GET /api/map-locations - Buscar todos os locais
export const getAllMapLocations = async (
  req: Request,
  res: Response<ApiResponse<IMapLocation[]>>
): Promise<void> => {
  try {
    const locations = await MapLocation.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: locations,
      message: 'Locais encontrados com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

// GET /api/map-locations/:id - Buscar um local por ID
export const getMapLocationById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IMapLocation>>
): Promise<void> => {
  try {
    const id = req.params.id;
    const location = await MapLocation.findById(id);
    
    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Local não encontrado'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: location,
      message: 'Local encontrado com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

// POST /api/map-locations - Criar um novo local
export const createMapLocation = async (
  req: Request<{}, ApiResponse<IMapLocation>, CreateMapLocationDTO>,
  res: Response<ApiResponse<IMapLocation>>
): Promise<void> => {
  try {
    const locationData: CreateMapLocationDTO = req.body;
    const newLocation = new MapLocation(locationData);
    const savedLocation = await newLocation.save();
    
    res.status(201).json({
      success: true,
      data: savedLocation,
      message: 'Local criado com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
};

// PUT /api/map-locations/:id - Atualizar um local
export const updateMapLocation = async (
  req: Request<{ id: string }, ApiResponse<IMapLocation>, UpdateMapLocationDTO>,
  res: Response<ApiResponse<IMapLocation>>
): Promise<void> => {
  try {
    const id = req.params.id;
    const updateData: UpdateMapLocationDTO = req.body;
    
    const location = await MapLocation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Local não encontrado'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: location,
      message: 'Local atualizado com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
};

// DELETE /api/map-locations/:id - Deletar um local
export const deleteMapLocation = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<null>>
): Promise<void> => {
  try {
    const id = req.params.id;
    const location = await MapLocation.findByIdAndDelete(id);
    
    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Local não encontrado'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: null,
      message: 'Local deletado com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

