'use client'

import React from 'react'

export default function AdminLogo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '32px 0',
      }}
    >
      <img
        src="/assets/nerau-logo-branco.png"
        alt="Nerau"
        style={{ maxWidth: '120px', height: 'auto', opacity: 0.9 }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#666',
          }}
        >
          Painel Gerencial
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            color: '#f0f0f0',
            letterSpacing: '0.5px',
          }}
        >
          Festival de Música de Maringá
        </span>
      </div>
    </div>
  )
}
