import { Component, OnInit } from '@angular/core';
import { TripService } from '../../core/services/trip.service';
import { Trip } from '../../core/models/trip';
import { TripFormComponent } from './trip-form.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-trips-list',
  standalone: true,
  imports: [CommonModule, DatePipe, TripFormComponent],
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedTrip: Trip | null = null;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar viajes';
        this.loading = false;
      }
    });
  }

  onCreate() {
    this.selectedTrip = null;
    this.showForm = true;
  }

  onEdit(trip: Trip) {
    this.selectedTrip = { ...trip };
    this.showForm = true;
  }

  onFormSave(trip: Trip) {
    if (trip.id) {
      // Editar
      this.tripService.updateTrip(trip.id, trip).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al actualizar viaje')
      });
    } else {
      // Crear
      this.tripService.createTrip(trip).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al crear viaje')
      });
    }
    this.showForm = false;
    this.selectedTrip = null;
  }

  onFormCancel() {
    this.showForm = false;
    this.selectedTrip = null;
  }

  onDelete(trip: Trip) {
    if (confirm(`¿Seguro que deseas eliminar este viaje?`)) {
      this.tripService.deleteTrip(trip.id).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al eliminar viaje')
      });
    }
  }

  private refresh() {
    this.loading = true;
    this.tripService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar viajes';
        this.loading = false;
      }
    });
  }
} 