import { Request, Response } from 'express';
import { MapLocation } from '../models/MapLocation.js';
import type { IMapLocation, NewMapLocation, MapLocationUpdate, ApiResponse } from '../types/index.js';

export const getAllMapLocations = async (req: Request, res: Response) => {
  try {
   const locations = await MapLocation.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: locations,
      message: 'Locais encontrados com sucesso'
    } as ApiResponse<IMapLocation[]>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IMapLocation[]>);
  }
};

export const getMapLocationById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const location = await MapLocation.findById(id);
    
    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Local não encontrado'
      } as ApiResponse<IMapLocation>);
      return; // Parar a execução aqui
    }
    
    res.status(200).json({
      success: true,
      data: location,
      message: 'Local encontrado com sucesso'
    } as ApiResponse<IMapLocation>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IMapLocation>);
  }
};

// POST Criar um novo local no mapa
export const createMapLocation = async (req: Request, res: Response) => {
  try {
    // 1. Pegar dados da requisição
    const locationData: NewMapLocation = req.body;
    // 2. Criar novo local no banco de dados
    // 2.1. Criar novo local com os dados recebidos
    const newLocation = new MapLocation(locationData);
    // 2.2. Salvar no banco de dados (await espera a operação terminar)
    const savedLocation = await newLocation.save();
    // 3. Retornar o local criado com status 201 (Criado com sucesso)
    res.status(201).json({
      success: true,
      data: savedLocation,
      message: 'Local criado com sucesso'
    } as ApiResponse<IMapLocation>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IMapLocation>);
  }
};

export const updateMapLocation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData: MapLocationUpdate = req.body;
    const location = await MapLocation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Local não encontrado'
      } as ApiResponse<IMapLocation>);
      return;
    }
    
    // Retornar o local atualizado com status 200 (OK)
    res.status(200).json({
      success: true,
      data: location,
      message: 'Local atualizado com sucesso'
    } as ApiResponse<IMapLocation>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IMapLocation>);
  }
};

export const deleteMapLocation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const location = await MapLocation.findByIdAndDelete(id);
    
    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Local não encontrado'
      } as ApiResponse<null>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: null,
      message: 'Local deletado com sucesso'
    } as ApiResponse<null>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<null>);
  }
};
