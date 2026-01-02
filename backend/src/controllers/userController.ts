import { Request, Response } from 'express';
import { User } from '../models/User.js';
import type { IUser, NewUser, UserUpdate, ApiResponse } from '../types/index.js';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      data: users
    } as ApiResponse<IUser[]>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IUser[]>);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      } as ApiResponse<IUser>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: user
    } as ApiResponse<IUser>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IUser>);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: NewUser = req.body;
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    
    res.status(201).json({
      success: true,
      data: savedUser,
      message: 'Usuário criado com sucesso'
    } as ApiResponse<IUser>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IUser>);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData: UserUpdate = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      } as ApiResponse<IUser>);
      return;
    }
    
    // Retornar o usuário atualizado com stat user 200 OK
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'Usuário atualizado com sucesso'
    } as ApiResponse<IUser>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse<IUser>);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      } as ApiResponse<{ message: string }>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: { message: 'Usuário deletado com sucesso' }
    } as ApiResponse<{ message: string }>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<{ message: string }>);
  }
};
