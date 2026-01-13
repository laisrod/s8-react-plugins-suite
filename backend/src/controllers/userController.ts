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
    let errorMessage = 'Erro ao criar usuário';
    
    if (error instanceof Error) {
      // Tratamento de erros específicos do Mongoose
      if (error.name === 'ValidationError') {
        const validationError = error as any;
        const fieldErrors = Object.keys(validationError.errors || {}).map(
          (key) => `${key}: ${validationError.errors[key].message}`
        );
        errorMessage = fieldErrors.length > 0 
          ? `Erro de validação: ${fieldErrors.join(', ')}`
          : `Erro de validação: ${error.message}`;
      } else if (error.name === 'MongoServerError' && (error as any).code === 11000) {
        errorMessage = 'Email já está em uso. Por favor, use outro email.';
      } else {
        errorMessage = error.message;
      }
    }

    console.error('Erro ao criar usuário:', {
      error,
      errorName: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : 'Unknown',
      userData: req.body
    });
    
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
    
    // Retornar o usuário atualizado com status 200 OK
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
