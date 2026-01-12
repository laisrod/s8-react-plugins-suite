import { Request, Response } from 'express';
import { ChartData } from '../models/ChartData.js';
import type { IChartData, NewChartData, ChartDataUpdate, ApiResponse } from '../types/index.js';

export const getAllChartData = async (req: Request, res: Response) => {
  try {

    const category = req.query.category as string | undefined;
    const chartType = req.query.chartType as string | undefined;
    
    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (chartType) filter.chartType = chartType;
    
    const data = await ChartData.find(filter).sort({ date: 1, createdAt: 1 });
    
    res.status(200).json({
      success: true,
      data: data,
      message: 'Dados encontrados com sucesso'
    } as ApiResponse<IChartData[]>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IChartData[]>);
  }
};

export const getChartDataById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ChartData.findById(id);
    
    if (!data) {
      res.status(404).json({
        success: false,
        error: 'Dado não encontrado'
      } as ApiResponse<IChartData>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: data,
      message: 'Dado encontrado com sucesso'
    } as ApiResponse<IChartData>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IChartData>);
  }
};

export const createChartData = async (req: Request, res: Response) => {
  try {
    const chartData: NewChartData = req.body;
    const newData = new ChartData(chartData);
    const savedData = await newData.save();
    
    res.status(201).json({
      success: true,
      data: savedData,
      message: 'Dado criado com sucesso'
    } as ApiResponse<IChartData>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IChartData>);
  }
};

export const updateChartData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData: ChartDataUpdate = req.body;
    
    const data = await ChartData.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!data) {
      res.status(404).json({
        success: false,
        error: 'Dado não encontrado'
      } as ApiResponse<IChartData>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: data,
      message: 'Dado atualizado com sucesso'
    } as ApiResponse<IChartData>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IChartData>);
  }
};

export const deleteChartData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ChartData.findByIdAndDelete(id);
    
    if (!data) {
      res.status(404).json({
        success: false,
        error: 'Dado não encontrado'
      } as ApiResponse<null>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: null,
      message: 'Dado deletado com sucesso'
    } as ApiResponse<null>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<null>);
  }
};
